const { expect, requester, assert, agent } = require("./set_up");
const { users } = require("./fake_data");
const { pool } = require("../server/models/mysql_conn");
const { User } = require("../server/models/user_model");
const TOKEN_EXPIRE_TIME = parseInt(process.env.TOKEN_EXPIRE_TIME);

describe("user", () => {
    describe("user sign up", () => {
        it("sign up with employee", async () => {
            const user = {
                username: "HaoyuWang",
                role: "employee",
                email: "siddwang@mayo.com",
                password: "password",
            };

            const res = await requester.post("/api/1.0/signup").send(user);

            const data = res.body.data;

            expect(Object.keys(data)).to.have.lengthOf(6);
            expect(data.access_token).to.be.a("string");
            expect(data.tokenExpireTime).to.equal(TOKEN_EXPIRE_TIME);
            expect(res).to.have.cookie("Authorization");
        });

        it("sign up without username or password or email", async () => {
            const user1 = {
                username: "HaoyuWang",
                role: "employee",
                password: "password",
            };

            const res1 = await requester.post("/api/1.0/signup").send(user1);

            expect(res1).to.have.status(400);
            expect(res1.body.error).to.equal("Lack of necessary information!");

            const user2 = {
                role: "employee",
                email: "siddwang@mayo.com",
                password: "password",
            };

            const res2 = await requester.post("/api/1.0/signup").send(user2);

            expect(res2).to.have.status(400);
            expect(res2.body.error).to.equal("Lack of necessary information!");

            const user3 = {
                username: "HaoyuWang",
                role: "employee",
                email: "siddwang@mayo.com",
            };

            const res3 = await requester.post("/api/1.0/signup").send(user3);

            expect(res3).to.have.status(400);
            expect(res3.body.error).to.equal("Lack of necessary information!");
        });

        it("sign up with invalid email format", async () => {
            const user = {
                username: "Hao Yu Wang",
                role: "employee",
                email: "siddwang.#mayo.com",
                password: "password",
            };

            const res = await requester.post("/api/1.0/signup").send(user);

            expect(res).to.have.status(400);
            expect(res.body.error).to.equal("Invalid email format!");
        });

        it("sign up with existed email", async () => {
            const user = {
                username: users[0].username,
                role: "employer",
                email: users[0].email,
                password: "password",
            };

            const res = await requester.post("/api/1.0/signup").send(user);

            expect(res).to.have.status(403);
            expect(res.body.error).to.equal("Email has already signed up!");
        });

        it("sign up with malicious email", async () => {
            const user = {
                username: users[0].username,
                email: "<script>alert(1)</script>",
                password: "password",
                role: "employee",
            };

            const res = await requester.post("/api/1.0/signup").send(user);

            expect(res).to.have.status(400);
            expect(res.body.error).to.equal("Invalid email format!");
        });
    });

    describe("user sign in", () => {
        it("sign in with correct password by employee", async () => {
            const user1 = users[2];
            const user = {
                email: user1.email,
                password: user1.password,
                role: "employee",
            };
            const res = await requester.post("/api/1.0/signin").send(user);

            const data = res.body.data;
            expect(Object.keys(data)).to.have.lengthOf(6);
            expect(data.access_token).to.be.a("string");
            expect(data.tokenExpireTime).to.equal(TOKEN_EXPIRE_TIME);
            expect(res).to.have.cookie("Authorization");
        });

        it("sign in without email or password by employee", async () => {
            const user1 = users[2];
            const userNoEmail = {
                password: user1.password,
                role: "employee",
            };
            const res1 = await requester.post("/api/1.0/signin").send(userNoEmail);

            expect(res1).to.have.status(400);
            expect(res1.body.error).to.equal("Lack of necessary information!");

            const userNoPassword = {
                email: user1.email,
                role: "employee",
            };
            const res2 = await requester.post("/api/1.0/signin").send(userNoPassword);

            expect(res2).to.have.status(400);
            expect(res2.body.error).to.equal("Lack of necessary information!");
        });

        it("sign in with wrong password by employee", async () => {
            const user1 = users[2];
            const user = {
                email: user1.email,
                password: "wrongpassword",
                role: "employee",
            };

            const res = await requester.post("/api/1.0/signin").send(user);

            expect(res).to.have.status(403);
            expect(res.body.error).to.equal("Wrong password!");
        });

        it("sign in with not exist", async () => {
            const user = {
                email: "notexist@mail.com",
                password: "wrongpassword",
                role: "employee",
            };

            const res = await requester.post("/api/1.0/signin").send(user);
            expect(res).to.have.status(403);
            expect(res.body.error).to.equal("Email is not exist!");
        });

        it("sign in with malicious password", async () => {
            const user1 = users[2];
            const user = {
                email: user1.email,
                password: '" OR 1=1; -- ',
                role: "employee",
            };

            const res = await requester.post("/api/1.0/signin").send(user);
            expect(res).to.have.status(403);
            expect(res.body.error).to.equal("Wrong password!");
        });
    });

    describe("user log out", () => {
        it("log out with cookie Authorization", async () => {
            const user1 = users[2];
            const user = {
                email: user1.email,
                password: user1.password,
                role: "employee",
            };
            const resSignin = await agent.post("/api/1.0/signin").send(user);
            expect(resSignin).to.have.cookie("Authorization");

            const resLogout = await agent.get("/api/1.0/logout");
            expect(resLogout).to.have.status(200);
            expect(resLogout).to.not.have.cookie("Authorization");

            agent.close();
        });

        it("log out without cookie Authorization", async () => {
            const res = await requester.get("/api/1.0/logout");
            expect(res).to.have.status(401);
            expect(res.body.error).to.equal("Unauthorized");
        });
    });
});
