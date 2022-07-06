const { queryDB, pool } = require('./mysql_conn.js')

const createResume = async (userId, resume) => {
    const conn = await pool.getConnection()
    try {
        let skills = []
        let projects = []
        let experience = []
        let education = []

        const profile = {
            user_id: userId,
            resume_name: resume.resumeName,
            show_resume: resume.showResume ? resume.showResume : 0,
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
        console.log(resume.skillName, resume.proficiency, resume.skillInfo)
        if (resume.skillName) {
            for (let i = 0; i < resume.skillName.length; i++) {
                skills.push([result.insertId, resume.skillName[i], resume.proficiency[i], resume.skillInfo[i]])
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

const getResumeDetail = async (resumeId) => {

    const [resume] = await queryDB(`
    SELECT resume_id, resume_name, user_id, show_resume, user_name, gender, 
    birthday, show_birthday, phone, contact_email, personal_url, bio, 
    experience_title, experience_org, experience_start, experience_end, experience_intro,
    project_title, project_link, project_intro, project_image, 
    education_title, education_department, education_degree, education_start, education_end , 
    skill_name, skill_proficiency, skill_intro
    FROM (SELECT education.resume_id, experience_title, experience_org, 
    experience_start, experience_end, experience_intro, project_title, 
    project_link, project_intro, project_image, education_title,  
    education_department, education_degree, education_start, education_end ,
    json_arrayagg(skill_name) AS skill_name,  
    json_arrayagg(skill_proficiency) AS skill_proficiency, 
    json_arrayagg(skill_intro) AS skill_intro
    FROM (SELECT project.resume_id, experience_title, experience_org, 
    experience_start, experience_end, experience_intro, project_title, 
    project_link, project_intro, project_image,
    json_arrayagg(education_title) AS education_title,  
    json_arrayagg(education_department) AS education_department, 
    json_arrayagg(education_degree) AS education_degree, 
    json_arrayagg(education_start) AS education_start,
    json_arrayagg(education_end) AS education_end 
    FROM (select experience.resume_id, experience_title, experience_org,  
    experience_start, experience_end, experience_intro,
    json_arrayagg(project_title) AS project_title,  
    json_arrayagg(project_link) AS project_link, 
    json_arrayagg(project_intro) AS project_intro, 
    json_arrayagg(project_image) AS project_image
    FROM (SELECT resume_id, json_arrayagg(experience_title) AS experience_title,  
    json_arrayagg(experience_org) AS experience_org, 
    json_arrayagg(experience_start) AS experience_start, 
    json_arrayagg(experience_end) AS experience_end,
    json_arrayagg(experience_intro) AS experience_intro
    FROM mayones.resume_experience
    WHERE resume_id = ?
    GROUP BY resume_id) AS experience
    LEFT JOIN mayones.resume_projects
    ON experience.resume_id = resume_projects.resume_id
    GROUP BY experience.resume_id) AS project
    LEFT JOIN mayones.resume_education
    ON project.resume_id = resume_education.resume_id
    GROUP BY project.resume_id) AS education
    LEFT JOIN mayones.resume_skills
    ON education.resume_id = resume_skills.resume_id
    GROUP BY education.resume_id) AS skills
    RIGHT JOIN mayones.resume
    ON skills.resume_id = resume.id
    WHERE resume.id = ?`, [resumeId, resumeId])

    return resume
}

const getUserAllResumes = async (userId) => {
    const sql = `
    SELECT id as resume_id , resume_name, update_at FROM mayones.resume
    WHERE user_id = ? 
    Limit 5
    `
    const result = await queryDB(sql, userId)
    return result
}



module.exports = {
    createResume,
    getResumeDetail,
    getUserAllResumes
}