const faker = require('faker');
const Post = require("./models/post");
const cities = require("cities.json");

const seedPost = async function(){
  await Post.remove();
  for (const el of new Array(200)) {
    const random700 = Math.floor(Math.random() * 700)
    const postData = {
      title: faker.lorem.word(),
      description: faker.lorem.text(),
      author: {
          '_id': '5d27bb2dd283672b294c6ff4',
          'username':"Alex"
        },
      location: `${cities[random700].name}, ${cities[random700].country}`,
      geometry:{
        type: 'Point',
        coordinates: [ cities[random700].lng, cities[random700].lat ]
      },
      price: Math.floor((Math.random()+1) * 136)
    }
    let post = new Post(postData)
    post.properties.description = `<strong><a href="/posts/${post._id}">${post.title}</a></strong>`

    post.save();
  }
  console.log('200 posts created')
}

module.exports = seedPost;