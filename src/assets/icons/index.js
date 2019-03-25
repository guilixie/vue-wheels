// auto import icons
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', true, /\.svg$/)

// console.log(req.keys())

requireAll(req)

export default req.keys()
