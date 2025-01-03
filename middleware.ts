export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/blogs/new',
        '/issues/edit/:id+'
    ]
}