import httpInstance from "@/utils/http";

function getCategory() {
    httpInstance({
        url: '/home/category/head'
    })
}

export { getCategory }