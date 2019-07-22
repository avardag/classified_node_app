const faker = require('faker');
const Post = require("./models/post");

const seedPost = async function(){
  await Post.remove();
  for (const el of new Array(40)) {
    const post = {
      title: faker.lorem.word(),
      description: faker.lorem.text(),
      author: {
          '_id': '5d27bb2dd283672b294c6ff4',
          'username':"Alex"
        },
      location: 'Khasavyurt, Russia',
      coordinates: [ 46.58333, 43.25 ],
      price: Math.floor((Math.random()+1) * 136)
    }
    await Post.create(post)
  }
  console.log('40 posts created')
}

module.exports = seedPost;