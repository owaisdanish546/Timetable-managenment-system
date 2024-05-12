import { fileURLToPath } from 'url';
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export async function generate_timetable_controller(req, res) {
    const user_id = req.params.user_id;
   
    // setTimeout(()=>{
        const filePath = path.join(__dirname, '../../timetables',`timetable${user_id}.xlsx`);

    // Set the Content-Disposition header to force the browser to use the actual filename
    res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`);

    // Send the file as an attachment
    res.sendFile(filePath);
    // },3000);
}