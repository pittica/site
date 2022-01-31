const path = require("path")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.createAsset = async (
  node,
  createNode,
  createNodeId,
  getCache,
  cache
) => {
  try {
    const ext = path.extname(node.fileName)
    const fileNode = await createRemoteFileNode({
      url: node.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      getCache,
      name: path.basename(node.fileName, ext),
      ext,
    })

    return fileNode
  } catch (e) {
    console.error("GraphCMS", e)
  }
}
