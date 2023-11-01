const router = require('express').Router();
// const fetch = require('node-fetch');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		});

		const posts = postData.map((post) => post.get({ plain: true }));

		res.render('home', {
			posts,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/profile', withAuth, async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					where: {
						id: req.session.user_id,
					},
					attributes: { exclude: ['password'] },
				},
			],
		});

		const posts = postData.map((post) => post.get({ plain: true }));

		res.render('profile', {
			posts,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/profile/:id', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					where: {
						id: req.params.id,
					},
					attributes: { exclude: ['password'] },
				},
			],
		});

		const posts = postData.map((post) => post.get({ plain: true }));

		res.render('profiles', {
			posts,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/post/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		});

		const commentData = await Comment.findAll({
			include: [
				{
					model: User,
					attributes: { exclude: ['password'] },
				},
				{
					model: Post,
					where: {
						id: req.params.id,
					},
				},
			],
		});

		const post = postData.get({ plain: true });
		const comments = commentData.map((comment) =>
			comment.get({ plain: true }),
		);

		console.log(comments);

		res.render('post', {
			post,
			comments,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/login', async (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}

	res.render('login');
});

router.get('/signup', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}

	res.render('signup');
});

router.get('/new_post', withAuth, async (req, res) => {
	try {
		res.render('newPost', {
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/comment/:id', withAuth, async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		});
		const post = postData.get({ plain: true });

		res.render('newComment', {
			post,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/update_post/:id', withAuth, async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		});
		const post = postData.get({ plain: true });

		res.render('updatePost', {
			post,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
