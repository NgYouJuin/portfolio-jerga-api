const express = require("express");
const { checkJwt, checkRole } = require("../controllers/auth");
const router = express();
const { getBlogs, getBlogById, getBlogBySlug, createBlog, updateBlog, getBlogByUser, deleteBlog } = require('../controllers/blogs')

router.get('/', getBlogs)

router.get('/me', checkJwt, checkRole('admin'), getBlogByUser)

router.get('/:id', getBlogById)

router.get('/s/:slug', getBlogBySlug)

router.post('/', checkJwt, checkRole('admin'), createBlog)

router.patch('/:id', checkJwt, checkRole('admin'), updateBlog)

module.exports = router;