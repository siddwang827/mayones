const { queryDB, pool } = require('./mysql_conn.js')

async function createResume(userId, resume) {
    const conn = await pool.getConnection()
    try {
        let skills = []
        let projects = []
        let experience = []
        let education = []

        const profile = {
            user_id: userId,
            user_name: resume.name,
            gender: resume.gender,
            show_birthday: resume.showBirthday ? resume.showBirthday : 0,
            birthday: resume.birthday,
            phone: resume.phone,
            contact_email: resume.emailContact,
            personal_url: resume.personalPageUrl,
            bio: resume.bio
        }
        await conn.query('START TRANSACTION');
        const [result] = await conn.query("INSERT INTO mayones.resume SET ?", [profile])

        if (resume.skillName) {
            for (let i = 0; i < resume.skillName.length; i++) {
                skills.push([result.insertId, resume.skillName[i], resume.skillProficiency[i], resume.skillInfo[i]])
            }
            await conn.query("INSERT INTO mayones.resume_skills (resume_id, skill_name,skill_proficiency, skill_intro) VALUES ? ", [skills])
        }

        if (resume.projectTitle) {
            for (let i = 0; i < resume.projectTitle.length; i++) {
                projects.push([result.insertId, resume.projectTitle[i], resume.projectLink[i], resume.projectInfo[i]])
            }
            await conn.query("INSERT INTO mayones.resume_projects (resume_id, project_title, project_link, project_intro) VALUES ? ", [projects])
        }

        if (resume.experienceName) {
            for (let i = 0; i < resume.experienceName.length; i++) {
                experience.push([result.insertId, resume.experienceName[i], resume.experienceCompanyName[i], resume.experienceTimeStart[i], resume.experienceTimeEnd[i], resume.experienceInfo[i]])
            }
            await conn.query("INSERT INTO mayones.resume_experience(resume_id, experience_title, experience_org, experience_start, experience_end, experience_intro) VALUES ? ", [experience])
        }

        if (resume.educationName) {
            for (let i = 0; i < resume.educationName.length; i++) {
                education.push([result.insertId, resume.educationName, resume.educationDepartment[i], resume.educationDegree[i], resume.educationTimeStart[i], resume.educationTimeEnd[i]])
            }
            await conn.query("INSERT INTO mayones.resume_education (resume_id, education_title, education_department, education_degree, education_start, education_end) VALUES ? ", [education])
        }

        await conn.query('COMMIT');
        return result.insertId;
    } catch (error) {
        await conn.query('ROLLBACK')
        console.log(error)
        return 'create resume failed'
    } finally {
        await conn.release()
    }

}





















module.exports = {
    createResume,
}