const API_PREFIX = '/api/v1/'
export const API = {
    HOST:         '//api.cms.com/',
    LOGIN:        `${API_PREFIX}login`,
    LOGOUT:       `${API_PREFIX}logout`,
    REGISTER:     `${API_PREFIX}register`,
    USER:         `${API_PREFIX}user`,
    WEBSITE:      `${API_PREFIX}website`,
    WEBSITEURL:   `${API_PREFIX}website/url`,
    WEBSITENAV:   `${API_PREFIX}website/nav`,
    WEBSITELOGO:  `${API_PREFIX}website/logo`,
    POST:         `${API_PREFIX}post`,
    PAGE:         `${API_PREFIX}page`,
    UPLOAD_IMAGE: `${API_PREFIX}image`,
    CHAT:         `${API_PREFIX}chat`,
    CHAT_HISTORY: `${API_PREFIX}chathistory`,
    PASSWORD:     `${API_PREFIX}password`,
    IM:           'http://im.geishajs.cn'
}

export const tag = {
    user: '管理员管理',
    product: '产品管理',
    pages: '页面管理',
    file: '文件管理',
    website: '网站管理'
}

export const userLimits = {
    tag: tag,
    value: ['product', 'pages', 'file', 'website']
}
