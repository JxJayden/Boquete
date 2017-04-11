const apiPrefix = '/api/v1/'
export const API = {
    HOST: '//api.cms.com/',
    LOGIN: `${apiPrefix}login`,
    LOGOUT: `${apiPrefix}logout`,
    REGISTER: `${apiPrefix}register`,
    USER: `${apiPrefix}user`,
    WEBSITE: `${apiPrefix}website`,
    WEBSITEURL: `${apiPrefix}website/url`,
    WEBSITENAV: `${apiPrefix}website/nav`,
    WEBSITELOGO: `${apiPrefix}/website/logo`,
    POST: `${apiPrefix}/post`
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
