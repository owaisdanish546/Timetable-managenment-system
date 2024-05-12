import * as venuesModel from "../models/venues_model.js";
import *as lecturesModel from "../models/lectures_model.js";
import { send_error_response, send_formatted_response } from "../utility/response.js";
import { fileURLToPath } from 'url';
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import ExcelJS from "exceljs";

export async function generate_timetable_middleware(req, res, next) {
    const user_id = req.params.user_id;

    async function createExcelWithWeekdays() {
        const workbook = new ExcelJS.Workbook();

        // Configuration for weekdays, venues, and time slots
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const timeSlots = ['8:00-8:55', '9:00-9:55', '10:00-10:55', '11:00-11:55', '12:00-12:55', '1:00-1:55', '2:00-2:55', '3:00-3:55'];

        const venues = [];
        //loading venues from database
        let result = await venuesModel.getAllVenues(user_id);
        if (result) {
            if (result.length === 0) {
                return send_formatted_response(res, `No venues found`, null, 404);

            } else {
                let i = 0;
                result.forEach(record => {
                    const [name] = record;
                    venues[i] = name;
                    i++;
                });
            }
        } else {
            return send_error_response(res, "Internal server error", 500);
        }

        const lectures = [];
        // loading lectures from database
        result = await lecturesModel.getAllLectures(user_id);
        if (result) {
            if (result.length === 0) {
                return send_formatted_response(res, `No lecture found`, null, 404);
            } else {
                let i = 0
                result.forEach(record => {
                    const [, teacher_id, course_code, section] = record;
                    lectures[i] = { teacher_id: teacher_id, course_code: course_code, section: section };
                    i++;
                });

            }
        } else {
            return send_error_response(res, "Internal server error", 500);
        }


        // Schedule initialization
        const schedule = {};

        weekdays.forEach(day => {
            venues.forEach(venue => {
                timeSlots.forEach(slot => {
                    if (!schedule[day]) schedule[day] = {};
                    if (!schedule[day][venue]) schedule[day][venue] = {};
                    schedule[day][venue][slot] = null; // No lecture assigned yet
                });
            });
        });
        // console.log(schedule)

        // Function to schedule lectures
        function scheduleLectures() {
            let attempts = {};

            lectures.forEach(lecture => {
                let count = 0;
                outerLoop:
                for (let day of weekdays) {
                    for (let slot of timeSlots) {
                        for (let venue of venues) {
                            // Check if slot is available and if constraints are met
                            if (!schedule[day][venue][slot] && checkConstraints(day, slot, venue, lecture)) {
                                schedule[day][venue][slot] = `${lecture.course_code}-${lecture.section} (${lecture.teacher_id})`;
                                count++;
                                if (count === 3) break outerLoop;
                            }
                        }
                    }
                }
                if (count < 3) {
                    attempts[`${lecture.course_code}-${lecture.section}`] = (attempts[`${lecture.course_code}-${lecture.section}`] || 0) + 1;
                    if (attempts[`${lecture.course_code}-${lecture.section}`] < 5) { // Try up to 5 times to schedule
                        lectures.push(lecture); // Requeue the lecture to try again
                    }
                }
            });
        }

        // Helper function to check for more than 'maxConsecutive' consecutive lectures for a teacher across all venues
        function checkTeacherConsecutiveLectures(day, teacherId, maxConsecutive) {
            let consecutiveCount = 1;

            // Iterate over each timeslot to determine if the teacher is teaching in any venue during that slot
            for (let i = 0; i < timeSlots.length; i++) {
                let isTeachingThisSlot = venues.some(venue => schedule[day][venue][timeSlots[i]] && schedule[day][venue][timeSlots[i]].endsWith(`(${teacherId})`));

                if (isTeachingThisSlot) {
                    consecutiveCount++;
                } else {
                    // Check if the break is needed and if it's sufficient
                    if (consecutiveCount === maxConsecutive) {
                        // Ensure there is at least one gap period after four consecutive lectures
                        if (i < timeSlots.length && venues.some(venue => schedule[day][venue][timeSlots[i]] && schedule[day][venue][timeSlots[i]].endsWith(`(${teacherId})`))) {
                            return false;  // No gap after four consecutive lectures
                        }
                    }
                    consecutiveCount = 1;  // Reset the consecutive count
                }

                if (consecutiveCount > maxConsecutive) {
                    return false;  // More than allowed consecutive lectures without a break
                }
            }

            return true;  // Return true if the rules are adhered to
        }

        // Check constraints for scheduling a lecture
        function checkConstraints(day, slot, venue, lecture) {
            // Check for the same teacher not being in more than one venue at the same slot
            for (let v of venues) {
                if (v !== venue && schedule[day][v][slot] && schedule[day][v][slot].endsWith(`(${lecture.teacher_id})`)) {
                    return false;  // Ensuring not double booking the teacher in different venues at the same slot
                }
            }

            // Check for the same section not being in more than one venue at the same slot
            for (let v of venues) {
                if (v !== venue && schedule[day][v][slot] && schedule[day][v][slot].includes(`-${lecture.section} (`)) {
                    return false;  // Ensuring not double booking the section in different venues at the same slot
                }
            }

            // Check for the same teacher not having more than 4 consecutive lectures in the whole day, with a mandatory gap
            if (!checkTeacherConsecutiveLectures(day, lecture.teacher_id, 4)) {
                return false;
            }

            return true;  // All constraints are met
        }


        scheduleLectures();

        // Generate Excel sheets
        function setupSheeet() {
            weekdays.forEach(weekday => {
                const sheet = workbook.addWorksheet(weekday);

                // Merge cells for the weekday name and format it with yellow background
                const mergeRange = `A1:${String.fromCharCode(65 + timeSlots.length)}1`;
                sheet.mergeCells(mergeRange);
                const titleCell = sheet.getCell('A1');
                titleCell.value = weekday;
                titleCell.font = { bold: true, size: 24 };
                titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
                titleCell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFFF00' },
                    bgColor: { argb: 'FFFFFF00' }
                };
                setBorders(titleCell, 'medium');
                // Set "venues/time slots" heading in row 2, column A
                sheet.getCell('A2').value = 'venues/time slots';
                sheet.getCell('A2').font = { bold: true };
                sheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };
                setBorders(sheet.getCell('A2'), 'thin');

                // Prepare headers for time slots with bold font and borders
                timeSlots.forEach((slot, index) => {
                    const cell = sheet.getCell(2, index + 2);
                    cell.value = slot;
                    cell.font = { bold: true };
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                    setBorders(cell, 'thin');
                });

                // Add venue names starting from row 3, column A with bold font and borders
                venues.forEach((venue, index) => {
                    const cell = sheet.getCell(index + 3, 1);
                    cell.value = venue;
                    cell.font = { bold: true };
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                    setBorders(cell, 'thin');
                });

                // Fill in the schedule with borders
                venues.forEach((venue, venueIndex) => {
                    timeSlots.forEach((slot, slotIndex) => {
                        const lecture = schedule[weekday][venue][slot];
                        const cell = sheet.getCell(venueIndex + 3, slotIndex + 2);
                        cell.value = lecture || "";
                        cell.font = { bold: true }; // Making the lecture details bold
                        cell.alignment = { vertical: 'middle', horizontal: 'center' };
                        setBorders(cell, 'thin');
                    });
                }
                );

                // Set column widths for better visibility
                sheet.columns.forEach(column => {
                    column.width = 20;
                    column.style = { font: { bold: true } };
                    column.alignment = { vertical: 'middle', horizontal: 'center' };
                });
                // Set "venues/time slots" heading in row 2, column A with red background
                sheet.getCell('A2').fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFF0000' }, // Red color
                    bgColor: { argb: 'FFFF0000' }
                };

                // Prepare headers for time slots with bold font, red background, and borders
                timeSlots.forEach((slot, index) => {
                    const cell = sheet.getCell(2, index + 2);
                    cell.value = slot;
                    cell.font = { bold: true };
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFF0000' }, // Red color
                        bgColor: { argb: 'FFFF0000' }
                    };
                    setBorders(cell, 'thin');
                });

                // Add venue names starting from row 3, column A with bold font, red background, and borders
                venues.forEach((venue, index) => {
                    const cell = sheet.getCell(index + 3, 1);
                    cell.value = venue;
                    cell.font = { bold: true };
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFF0000' }, // Red color
                        bgColor: { argb: 'FFFF0000' }
                    };
                    setBorders(cell, 'thin');
                });
                venues.forEach((venue, venueIndex) => {
                    timeSlots.forEach((slot, slotIndex) => {
                        const lecture = schedule[weekday][venue][slot];
                        const cell = sheet.getCell(venueIndex + 3, slotIndex + 2);

                        // Increase width and height of the cell by 50%
                        const currentWidth = cell.width;
                        const currentHeight = cell.height;
                        cell.width = currentWidth * 1.5;
                        cell.height = currentHeight * 1.5;

                        cell.value = lecture || "";
                        cell.font = { bold: true }; // Making the lecture details bold
                        cell.alignment = { vertical: 'middle', horizontal: 'center' };
                        setBorders(cell, 'thin');
                        

                        // Check if section format is '6n' or '7n' and set blue fill color
                        if (lecture && (lecture.includes('-5') || lecture.includes('-6'))) {
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FF0000FF' }, // Blue color
                                bgColor: { argb: 'FF0000FF' }
                            };
                        } else if (lecture && (lecture.includes('-7') || lecture.includes('-8'))) {
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FF808080' }, // Grey color
                                bgColor: { argb: 'FF808080' }
                            };
                        } else if (lecture && (lecture.includes('-3') || lecture.includes('-4'))) {
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFFFC0CB' }, // Pink color
                                bgColor: { argb: 'FFFFC0CB' }
                            };
                        } else if (lecture && (lecture.includes('-1') || lecture.includes('-2'))) {
                            cell.fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FF00FF00' }, // Green color
                                bgColor: { argb: 'FF00FF00' }
                            };
                        }
                    });
                });


            });

        }
        setupSheeet()
        try {
            await workbook.xlsx.writeFile(path.join(__dirname, '../../timetables', `Timetable${user_id}.xlsx`));
            return true;
        }
        catch (error) {
            console.error(error);
            //  console.log("hello mid2")          
            return false;
        }
    }

    function setBorders(cell, style) {
        cell.border = {
            top: { style: style },
            left: { style: style },
            bottom: { style: style },
            right: { style: style }
        };
    }

    let result = await createExcelWithWeekdays();
    if (result) {
        console.log('TimeTable Generated!');
        next();
    }
    else {
        if (!res.headersSent) { // if courses and venues empty createExcelWithWeekdays() return undefined and sends response to client so this is for again sending response 
            // console.log("hi")
            return send_error_response(res, "Could not generatae Timetable due to Internal server error", 500);

        }
    }

}