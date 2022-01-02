_G.pprint = function(...)
    local objects = {}
    for i = 1, select('#', ...) do
        local v = select(i, ...)
        table.insert(objects, vim.inspect(v))
    end

    print(table.concat(objects, '\n'))
    return ...
end

_G.typeRequire = function(modname)
    return require(modname)
end

_G.__modules = {}

require('core')

