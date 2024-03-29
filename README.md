# Mayones

A job searching platform with dual user perspectives for job seekers and employers.

Website URL: https://www.mayones.website

#### Test Account

Seeker [sign in link](https://mayones.website/employee/signin)

-   Account: seeker@mayo.com
-   Password: !QAZ2wsx

Employer [sign in link](https://mayones.website/employer/signin)

-   Account: employer@mayo.com
-   Password: !QAZ2wsx

## Features

-   Seeker
    -   Search job openings and companies by multiple criteria filter
        ![](/public/doc/seeker1.gif)
    -   Manage and edit multiple resume
    -   Preview resume and export to pdf
        ![](/public/doc/seeker3.gif)
    -   Follow job openings and companies in interested
    -   Send job application with designated resume
        ![](/public/doc/seeker4.gif)
    -   Manage job application histroy records including archive, cancel, preview and check state
        ![](/public/doc/seeker2.gif)
-   Employer

    -   Upload company detail while the image stored on AWS S3

    -   Manage job openings detail
    -   Confirm the interview date and send and invite email throgh nodemailer
        ![](/public/doc/employer.gif)

## System Architecture

![system architecture](/public/doc/architecture.png)

## Database Design

![database schema](/public/doc/database%20schema.png)

## Tech Stack

-   Back-End: Node.js, Express.js, NodeMailer
-   Front-End: JavaScript, CSS, HTML, jQuery
-   Database: MySQL
-   Cloud Service(AWS): EC2, RDS, ElastiCache, S3, CloudFront
-   Testing: Mocha, Chai
-   Container: Docker
-   Web Server: Nginx
-   OS: Linux

## Inspiration

The project is inspired by [Yourator](https://www.yourator.co/).

## Contact

Author: [Hao-Yu Wang](https://github.com/siddwang827)  
Email: haoyuwang827@gmail.com
