import request from '../../../util/request'
import terminalId from '../../terminalId'
/**
 * 获取文章分类列表
 * @param template string 模板标识
 * @param parentId int 上级分类ID
 */
export function GetCmsCategories (template, parentId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Cms',
      action: 'GetCmsCategories',
      terminal_id: terminalId,
      template: template,
      parent_id: parentId
    }
  })
}

/**
 * 获取文章列表
 * @param categoryId int 文章分类ID
 * @param page int
 * @param pageSize int
 */
export function GetCmsArticles (categoryId, pageSize, page) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Cms',
      action: 'GetCmsArticles',
      terminal_id: terminalId,
      category_id: categoryId,
      page: page,
      pagesize: pageSize
    }
  })
}

/**
 * 获取文章详情
 * article_id
 * @param articleId int 文章ID
 */
export function GetCmsArticleDetail (articleId) {
  return request({
    url: '',
    method: 'get',
    params: {
      packet: 'Cms',
      action: 'GetCmsArticleDetail',
      terminal_id: terminalId,
      article_id: articleId
    }
  })
}
