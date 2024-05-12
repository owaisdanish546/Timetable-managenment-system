import ExcelJS from "exceljs";

async function createExcelWithWeekdays() {
  const workbook = new ExcelJS.Workbook();

  // Configuration for weekdays, venues, and time slots
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const venues = ['Hall A', 'Hall B', 'Hall C', 'Hall D', 'Hall E'];
  const timeSlots = ['8:00-8:55', '9:00-9:55', '10:00-10:55', '11:00-11:55', '12:00-12:55', '1:00-1:55', '2:00-2:55', '3:00-3:55'];

  // Example list of lectures
  // const lectures = [
  //     { teacher_id: "T1", course_code: "C101", section: "S1" },
  //     { teacher_id: "T2", course_code: "C102", section: "S2" },
  //     { teacher_id: "T3", course_code: "C103", section: "S3" },
  //     // Add more lectures as needed
  // ];
  const lectures = [
    // Previous entries...
    { teacher_id: "T1", course_code: "C101", section: "1A" },
    { teacher_id: "T1", course_code: "C102", section: "1B" },
    { teacher_id: "T1", course_code: "C103", section: "1C" },
    { teacher_id: "T2", course_code: "C104", section: "1D" },
    { teacher_id: "T2", course_code: "C105", section: "1E" },
    { teacher_id: "T2", course_code: "C106", section: "1F" },
    { teacher_id: "T3", course_code: "C107", section: "1G" },
    { teacher_id: "T3", course_code: "C108", section: "1H" },
    { teacher_id: "T4", course_code: "C109", section: "2A" },
    { teacher_id: "T4", course_code: "C110", section: "2B" },
    { teacher_id: "T5", course_code: "C111", section: "2C" },
    { teacher_id: "T5", course_code: "C112", section: "2D" },
    { teacher_id: "T5", course_code: "C113", section: "2E" },
    { teacher_id: "T6", course_code: "C114", section: "2F" },
    { teacher_id: "T6", course_code: "C115", section: "2G" },
    { teacher_id: "T6", course_code: "C116", section: "2H" },
    { teacher_id: "T7", course_code: "C117", section: "3A" },
    { teacher_id: "T7", course_code: "C118", section: "3B" },
    { teacher_id: "T7", course_code: "C119", section: "3C" },
    { teacher_id: "T8", course_code: "C120", section: "3D" },
    { teacher_id: "T8", course_code: "C121", section: "3E" },
    { teacher_id: "T8", course_code: "C122", section: "3F" },
    { teacher_id: "T9", course_code: "C123", section: "3G" },
    { teacher_id: "T9", course_code: "C124", section: "3H" },
    { teacher_id: "T10", course_code: "C125", section: "4A" },
    { teacher_id: "T10", course_code: "C126", section: "4B" },
    { teacher_id: "T1", course_code: "C127", section: "4C" },
    { teacher_id: "T1", course_code: "C128", section: "4D" },
    { teacher_id: "T2", course_code: "C129", section: "4E" },
    { teacher_id: "T2", course_code: "C130", section: "4F" },
    { teacher_id: "T3", course_code: "C131", section: "4G" },
    { teacher_id: "T3", course_code: "C132", section: "4H" },
    { teacher_id: "T4", course_code: "C133", section: "5A" },
    { teacher_id: "T4", course_code: "C134", section: "5B" },
    { teacher_id: "T5", course_code: "C135", section: "5C" },
    { teacher_id: "T5", course_code: "C136", section: "5D" },
    { teacher_id: "T6", course_code: "C137", section: "5E" },
    { teacher_id: "T6", course_code: "C138", section: "5F" },
    { teacher_id: "T7", course_code: "C139", section: "5G" },
    { teacher_id: "T7", course_code: "C140", section: "5H" },
    { teacher_id: "T8", course_code: "C141", section: "6A" },
    { teacher_id: "T8", course_code: "C142", section: "6B" },
    { teacher_id: "T9", course_code: "C143", section: "6C" },
    { teacher_id: "T9", course_code: "C144", section: "6D" },
    { teacher_id: "T10", course_code: "C145", section: "6E" },
    { teacher_id: "T10", course_code: "C146", section: "6F" },
    { teacher_id: "T1", course_code: "C147", section: "6G" },
    { teacher_id: "T1", course_code: "C148", section: "6H" },
    { teacher_id: "T2", course_code: "C149", section: "7A" },
    { teacher_id: "T2", course_code: "C150", section: "7B" },
    // Continuation from C151 to C160, with each section running from A to H
    { teacher_id: "T3", course_code: "C151", section: "7C" },
    { teacher_id: "T3", course_code: "C152", section: "7D" },
    { teacher_id: "T4", course_code: "C153", section: "7E" },
    { teacher_id: "T4", course_code: "C154", section: "7F" },
    { teacher_id: "T5", course_code: "C155", section: "7G" },
    { teacher_id: "T5", course_code: "C156", section: "7H" },
    { teacher_id: "T6", course_code: "C157", section: "8A" },
    { teacher_id: "T6", course_code: "C158", section: "8B" },
    { teacher_id: "T7", course_code: "C159", section: "8C" },
    { teacher_id: "T7", course_code: "C160", section: "8D" },
    // Cycle through all courses again, starting from C101, until 120 unique lectures are filled
    // This cycling would continue, incrementally increasing section labels and cycling course codes from C101 to C160 repeatedly.
  ];
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
  console.log(schedule)

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
  await workbook.xlsx.writeFile('Timetable.xlsx');
  console.log('TimeTable Generated!');
}

function setBorders(cell, style) {
  cell.border = {
    top: { style: style },
    left: { style: style },
    bottom: { style: style },
    right: { style: style }
  };
}

createExcelWithWeekdays().catch(console.error);