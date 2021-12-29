local exports = {}

function exports.recordForEach(t, f)
    for k, v in pairs(t) do
        f(k, v)
    end
end

function exports.recordToArray(t,f)
    local arr = {}
    for k, v in pairs(t) do
        arr[#arr + 1] = f(k, v)
    end
    return arr
end

function exports.arrayForEach(t, f)
    for i, v in ipairs(t) do
        f(i, v)
    end
end

function exports.arrayMap(t, f)
    local arr = {}
    for i, v in ipairs(t) do
        arr[#arr + 1] = f(i, v)
    end
    return arr
end

return exports
