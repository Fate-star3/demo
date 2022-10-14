import Mock, { Random } from 'mockjs'
import axios from "axios";
export const getRestaurantsRequest = () =>
    axios.get('https://www.fastmock.site/mock/0a7dd8897c829f1675e2e5962a305383/MeiTuan/restaurants')

// @cname  伪造随机数据  中文  
// 拦截 

Mock.mock('init_movie', 'get', {  
    'data|10': [{
        'key|+1': 1,//自增  
        'title': Random.csentence(10, 13),
        'content|1': Random.paragraph(),
        'name': '@name',
        'email': '@email',
        'sex|1': ['男', '女'],
        'zip': Random.zip(),
        'avatar': Random.image('200*100', '#FF6600'),
        'privince': Random.province(),
        'city': Random.city(),
        'county': Random.county()
    }]
})
