const apiPrefix = '/api/v1/'
export const api = {
    login: `${apiPrefix}login`,
    logout: `${apiPrefix}logout`,
    user: `${apiPrefix}user`,
    website: `${apiPrefix}website`,
    websiteUrl: `${apiPrefix}website/url`
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
