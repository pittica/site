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
    return await createRemoteFileNode({
      url: node.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      getCache,
      name: path.basename(node.fileName, ext),
      ext,
    })
  } catch (e) {
    console.error("Asset", e)
  }
}
