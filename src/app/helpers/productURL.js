'use client';
export function productURL(product) {
    return `${product.title.replace(' ', '-')}-${product.id}`
};