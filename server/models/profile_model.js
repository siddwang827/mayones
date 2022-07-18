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

        if (resume.skillName) {
            for (let i = 0; i < resume.skillName.length; i++) {
                skills.push([result.insertId, resume.skillName[i], resume.skillProficiency[i], resume.skillInfo[i]])
            }
            await conn.query("INSERT INTO mayones.resume_skills (resume_id, skill_name,skill_proficiency, skill_intro) VALUES ? ", [skills])
        }

        if (resume.projectTitle) {
            for (let i = 0; i < resume.projectTitle.length; i++) {
                projects.push([result.insertId, resume.projectTitle[i], resume.projectLink[i], resume.projectInfo[i], resume.projectImage[i]])
            }
            await conn.query("INSERT INTO mayones.resume_projects (resume_id, project_title, project_link, project_intro, project_image) VALUES ? ", [projects])
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

const userUpdateResume = async (userId, resume,) => {
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
            bio: resume.bio,

        }

        await conn.query('START TRANSACTION');

        await conn.query(`UPDATE mayones.resume SET ? WHERE id = ?`, [profile, resume.resumeId])
        if (resume.skillId[0]) {
            console.log(resume.skillProficiency)
            for (let i = 0; i < resume.skillId.length; i++) {
                if (resume.skillId[i] == parseInt(resume.skillId[i])) {
                    skills.push([resume.skillId[i], resume.resumeId[0], resume.skillName[i], resume.skillProficiency[i], resume.skillInfo[i]])
                } else {
                    skills.push([null, resume.resumeId[0], resume.skillName[i], resume.skillProficiency[i], resume.skillInfo[i]])
                }
            }
            await conn.query(`INSERT INTO mayones.resume_skills 
            (id,  resume_id, skill_name, skill_proficiency, skill_intro) 
            VALUES ? 
            ON DUPLICATE KEY UPDATE 
            skill_name=VALUES(skill_name), 
            skill_proficiency=VALUES(skill_proficiency), 
            skill_intro=VALUES(skill_intro)`, [skills])
        }
        if (resume.projectId[0]) {
            for (let i = 0; i < resume.projectId.length; i++) {
                if (resume.projectId[i] == parseInt(resume.projectId[i])) {
                    if (resume.projectImageSrc[i][resume.projectId[i]] === 'upload') {
                        projects.push([resume.projectId[i], resume.resumeId[0], resume.projectTitle[i], resume.projectLink[i], resume.projectInfo[i], resume.projectImage.shift()])
                    } else {
                        projects.push([resume.projectId[i], resume.resumeId[0], resume.projectTitle[i], resume.projectLink[i], resume.projectInfo[i], resume.projectImageSrc[i][resume.projectId[i]]])
                    }
                } else {
                    projects.push([null, resume.resumeId[0], resume.projectTitle[i], resume.projectLink[i], resume.projectInfo[i], resume.projectImage.shift()])
                }

            }
            await conn.query(`INSERT INTO mayones.resume_projects 
            (id, resume_id, project_title,  project_link, project_intro, project_image ) 
            VALUES ? 
            ON DUPLICATE KEY UPDATE 
            project_title=VALUES(project_title), 
            project_link=VALUES(project_link), 
            project_intro=VALUES(project_intro), 
            project_image=VALUES(project_image)`, [projects])
        }

        if (resume.experienceId[0]) {
            for (let i = 0; i < resume.experienceId.length; i++) {
                if (resume.experienceId[i] == parseInt(resume.experienceId[i])) {
                    experience.push([resume.experienceId[i], resume.resumeId[0], resume.experienceName[i], resume.experienceCompanyName[i], resume.experienceTimeStart[i], resume.experienceTimeEnd[i], resume.experienceInfo[i]])
                } else {
                    experience.push([null, resume.resumeId[0], resume.experienceName[i], resume.experienceCompanyName[i], resume.experienceTimeStart[i], resume.experienceTimeEnd[i], resume.experienceInfo[i]])
                }
            }
            await conn.query(`INSERT INTO mayones.resume_experience 
            (id, resume_id, experience_title, experience_org, experience_start, experience_end, experience_intro) 
            VALUES ? 
            ON DUPLICATE KEY UPDATE 
            experience_title=VALUES(experience_title), 
            experience_org=VALUES(experience_org), 
            experience_start=VALUES(experience_start), 
            experience_end=VALUES(experience_end),  
            experience_intro=VALUES(experience_intro)`, [experience])
        }

        if (resume.educationId[0]) {
            for (let i = 0; i < resume.educationId.length; i++) {
                if (resume.educationId[i] == parseInt(resume.educationId[i])) {
                    education.push([resume.educationId[i], resume.resumeId[0], resume.educationName[i], resume.educationDepartment[i], resume.educationDegree[i], resume.educationTimeStart[i], resume.educationTimeEnd[i]])
                } else {
                    education.push([null, resume.resumeId[0], resume.educationName, resume.educationDepartment[i], resume.educationDegree[i], resume.educationTimeStart[i], resume.educationTimeEnd[i]])
                }
            }
            await conn.query(`INSERT INTO mayones.resume_education 
            (id , resume_id, education_title, education_department, education_degree, education_start, education_end) 
            VALUES ? 
            ON DUPLICATE KEY UPDATE 
            education_title=VALUES(education_title), 
            education_department=VALUES(education_department), 
            education_degree=VALUES(education_degree), 
            education_start=VALUES(education_start),  
            education_end=VALUES(education_end)`, [education])
        }
        await conn.query('COMMIT');
    } catch (error) {
        await conn.query('ROLLBACK')
        console.log(error)
        return 'create resume failed'
    } finally {
        await conn.release()
    }
}

const getResumeDetail = async (resumeId, user) => {
    let binding = [resumeId]
    let sqlSelect = `
    SELECT resume_profile_projects_skills_experience.*,
    json_arrayagg(resume_education.id) AS education_id,  
    json_arrayagg(education_title) AS education_title, 
    json_arrayagg(education_department) AS education_department, 
    json_arrayagg(education_degree) AS education_degree, 
    json_arrayagg(education_start) AS education_start, 
    json_arrayagg(education_end) AS education_end
        FROM (SELECT resume_profile_projects_skills.*, 
            json_arrayagg(resume_experience.id) AS experience_id,
            json_arrayagg(experience_title) AS experience_title, 
            json_arrayagg(experience_org) AS experience_org, 
            json_arrayagg(experience_start) AS experience_start, 
            json_arrayagg(experience_end) AS experience_end, 
            json_arrayagg(experience_intro) AS experience_intro
                FROM (SELECT resume_profile_projects.*, 
                json_arrayagg(resume_skills.id) AS skill_id, 
                json_arrayagg(skill_name) AS skill_name, 
                json_arrayagg(skill_proficiency) AS skill_proficiency, 
                json_arrayagg(skill_intro) AS skill_intro
                    FROM (SELECT resume_profile.* , 
                        json_arrayagg(resume_projects.id) AS project_id, 
                        json_arrayagg(project_title) AS project_title, 
                        json_arrayagg(project_link) AS project_link, 
                        json_arrayagg(project_intro) AS project_intro, 
                        json_arrayagg(project_image) AS project_image 
                        FROM (SELECT id , user_id, resume_name, show_resume, user_name , gender, birthday, show_birthday, phone, contact_email, personal_url, bio, update_at
                        FROM mayones.resume `
    let sqlCondition = `WHERE resume.id = ? `
    let sqlJoinTable = `GROUP BY resume.id) AS resume_profile
    LEFT JOIN mayones.resume_projects
    ON resume_profile.id = resume_projects.resume_id ) AS resume_profile_projects
    LEFT JOIN mayones.resume_skills
    ON resume_profile_projects.id = resume_skills.resume_id) AS resume_profile_projects_skills
    LEFT JOIN mayones.resume_experience
    ON resume_profile_projects_skills.id = resume_experience.resume_id) AS resume_profile_projects_skills_experience
    LEFT JOIN mayones.resume_education
    ON resume_profile_projects_skills_experience.id = resume_education.resume_id`

    if (user.role === "employee") {
        sqlCondition += `AND user_id = ? `
        binding.push(user.id)
    }

    const sql = sqlSelect + sqlCondition + sqlJoinTable
    const [resume] = await queryDB(sql, binding)
    return resume
}

const getUserAllResumes = async (userId) => {
    const sql = `
    SELECT id as resume_id , resume_name, update_at FROM mayones.resume
    WHERE user_id = ? 
    `
    try {
        const result = await queryDB(sql, userId)
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}

const deleteUserResume = async (userId, resumeId) => {
    const conn = await pool.getConnection()
    try {
        await conn.query('START TRANSACTION');
        await conn.query('DELETE FROM mayones.resume_experience WHERE resume_id =?', [resumeId])
        await conn.query('DELETE FROM mayones.resume_projects WHERE resume_id =?', [resumeId])
        await conn.query('DELETE FROM mayones.resume_skills WHERE resume_id =?', [resumeId])
        await conn.query('DELETE FROM mayones.resume_education WHERE resume_id =?', [resumeId])
        const [result] = await conn.query('DELETE FROM mayones.resume WHERE id =? AND user_id = ?', [resumeId, userId])
        await conn.query('COMMIT');
        return result.affectedRows;
    } catch (error) {
        await conn.query('ROLLBACK')
        console.log(error)
        throw error
    } finally {
        await conn.release()
    }
}

const checkUserOwnResume = async (userId, resumeId) => {
    const [result] = await queryDB('SELECT * FROM mayones.resume WHERE id = ? AND user_id = ?', [resumeId, userId])

    return result
}

const checkResumeApplication = async (resumeId) => {
    const [result] = await queryDB('SELECT * FROM mayones.job_application WHERE apply_resume_id = ? ', [resumeId])

    return result
}

const updateResumeEmployerCheck = async (applicationId) => {
    queryDB('UPDATE mayones.job_application SET employer_checked = 1 WHERE id = ?', [applicationId])

    return
}

const deleteSingleSkill = async (skillId) => {
    try {
        const result = await queryDB(`DELETE FROM mayones.resume_skills WHERE id = ?`, skillId)
        console.log(result)
    } catch (error) {
        console.log(error)
        throw error
    }

}
const deleteSingleExperience = async (experienceId) => {
    try {
        const result = await queryDB(`DELETE FROM mayones.resume_experience WHERE id = ?`, experienceId)
        console.log(result)
    } catch (error) {
        console.log(error)
        throw error
    }

}
const deleteSingleProject = async (projectId) => {
    try {
        const result = await queryDB(`DELETE FROM mayones.resume_projects WHERE id = ?`, projectId)
        console.log(result)
    } catch (error) {
        console.log(error)
        throw error
    }

}
const deleteSingleEducation = async (educationId) => {
    try {
        const result = await queryDB(`DELETE FROM mayones.resume_education WHERE id = ?`, educationId)
        console.log(result)
    } catch (error) {
        console.log(error)
        throw error
    }

}
module.exports = {
    createResume,
    userUpdateResume,
    getResumeDetail,
    getUserAllResumes,
    deleteUserResume,
    checkUserOwnResume,
    checkResumeApplication,
    updateResumeEmployerCheck,
    deleteSingleSkill,
    deleteSingleExperience,
    deleteSingleProject,
    deleteSingleEducation,
}