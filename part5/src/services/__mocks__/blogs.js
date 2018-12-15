let token

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const blogs = [
  {
    author: "kek",
    id: "5c100ef58f10f1285112545a",
    likes: 5,
    title: "toimiiko?",
    url: "lol.fi",
    user: {
      _id: "5c0ee2d055b2fe1ac5037781",
      ame: "taavi",
      username: "taavi",
    }
  }, {
    author: "",
    id: "5c0f68d994bfa34c644376fb",
    likes: 4,
    title: "",
    url: "",
    user: {
      _id: "5c0ee2d055b2fe1ac5037781",
      name: "taavi",
      username: "taavi",
    }
  }, {

    author:"test",
    id:"5c0ed7ba73811c74c6710505",
    likes:2,
    title:"testaasdus",
    url:"http://example.com",
    user: {
      _id:"5c0ed7ab73811c74c6710504",
      name:"test2",
      username:"uusi",
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs, setToken }