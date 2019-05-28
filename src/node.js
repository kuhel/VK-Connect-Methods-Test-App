const crypto = require('crypto') //модуль для криптографии Nodejs
const { stringify } = require('querystring') //методы для парсинга строки
const url = require('url')


const URL =
		'https://kuhel.github.io/VK-Connect-Methods-Test-App/?vk_access_token_settings=friends%2Cvideo%2Cads&vk_app_id=6656968&vk_are_notifications_enabled=0&vk_is_app_user=1&vk_language=ru&vk_platform=desktop_web&vk_user_id=24512&sign=CB8OpxolzeBgHTXg3uplH2iNSHMjGDf5JgIEGHwtHl4',
	CLIENT_SECRET = 'api4s0jM9cMaSdc5SbaC'

const checkVKQueryParamsSign = params => {
	const query = url.parse(params, true).query
	const list_of_params = Object.entries(query) //перевод в обьекта параметро в список
		.filter(e => e[0].startsWith('vk_')) //фильтрация параметров VK
		.sort((a, b) => {
			if (a[0] < b[0]) {
				return -1
			}
			if (a[0] > b[0]) {
				return 1
			}
			return 0
		}) //сортировка по алфавиту
	const params_str = stringify(
		list_of_params.reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {})
	) //перевод параметров в строковый вид
	const hmac = crypto.createHmac('sha256', CLIENT_SECRET) //инициализация генератора подписи
	hmac.update(params_str) //добавление строки с параметрами
	const sign = hmac
		.digest('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '') //генерация подписи
	return sign === query.sign //сравнение подписей
}

console.log(checkVKQueryParamsSign(URL))