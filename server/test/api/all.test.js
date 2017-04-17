/* global describe, it */
var request = require('supertest'),
    should = require('should'), // eslint-disable-line
    faker = require('faker'),
    server = request.agent('http://localhost:3000')

var newUer = {
    username: 'test-' + faker.name.findName(),
    password: 'test'
}

var navData, postData, pageData

describe('USER REGISTER', function () {
    it('注册用户，注册成功，返回 200', function (done) {
        server
            .post('/v1/register')
            .send(newUer)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                done()
            })
    })
})

describe('USER LOGIN', function () {
    it('用户登录，登录成功，返回 200', function (done) {
        server
            .post('/v1/login')
            .send(newUer)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                done()
            })
    })
})

describe('GET WEBSITE URL', function () {
    it('获取网站 URL，返回 200', function (done) {
        server
            .get('/v1/website/url')
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                done()
            })
    })
})

describe('GET WEBSITE INFO', function () {
    it('获取网站信息，返回 200', function (done) {
        server
            .get('/v1/website')
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                done()
            })
    })
})

describe('GET WEBSITE NAVIGATION INFO', function () {
    it('获取网站导航栏信息，返回 200', function (done) {
        server
            .get('/v1/website/nav')
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                navData = res.body.data.nav
                done()
            })
    })
})

describe('UPDATE WEBSITE NAVIGATION INFO', function () {

    it('更新网站导航栏，返回 200', function (done) {
        server
            .put('/v1/website/nav')
            .send({nav: navData})
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                done()
            })
    })
})

var newPost = {
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs()
}

describe('POST POST INFO', function () {
    it('发布文章，返回 200', function (done) {
        server
            .post('/v1/post')
            .send(newPost)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                postData = res.body.data
                done()
            })
    })
})

describe('PUT POST INFO', function () {
    it('更新文章，返回 200', function (done) {
        server
            .put('/v1/post')
            .send({
                content: faker.lorem.words(),
                title: faker.lorem.paragraphs(),
                id: postData._id
            })
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                done()
            })
    })
})

describe('GET POST INFO', function () {
    it('获取所有文章信息，返回 200', function (done) {
        server
            .get('/v1/post')
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                done()
            })
    })
})

describe('GET ONE POST INFO', function () {
    it('获取单篇文章信息，返回 200', function (done) {
        server
            .get('/v1/post?id=' + postData._id)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                done()
            })
    })
})

describe('DELETE POST INFO', function () {
    it('删除发布的某篇文章，返回 200', function (done) {
        server
            .delete('/v1/post')
            .send({id: postData._id})
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                done()
            })
    })
})


// page unit test
describe('POST PAGE INFO', function () {
    it('添加新页面，返回 200', function (done) {
        server
            .post('/v1/page')
            .send({title: faker.lorem.words()})
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                pageData = res.body.data
                done()
            })
    })
})

describe('PUT PAGE INFO', function () {
    it('更新页面，返回 200', function (done) {
        server
            .put('/v1/page')
            .send({
                title: faker.lorem.paragraphs(),
                id: pageData._id
            })
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                done()
            })
    })
})

describe('GET ALL PAGE INFO', function () {
    it('获取所有页面信息，返回 200', function (done) {
        server
            .get('/v1/page')
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                done()
            })
    })
})

describe('GET ONE PAGE INFO', function () {
    it('获取单篇文章信息，返回 200', function (done) {
        server
            .get('/v1/page?id=' + pageData._id)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                done()
            })
    })
})

describe('DELETE PAGE INFO', function () {
    it('删除页面，返回 200', function (done) {
        server
            .delete('/v1/page')
            .send({id: pageData._id})
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200)
                res.body.err.should.equal(false)
                done()
            })
    })
})
