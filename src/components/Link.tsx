import { forwardRef } from 'react'
import { Link as RouterLink, type LinkProps } from 'react-router-dom'

// Every page lives at an address ending in "/", and GitHub Pages answers "/seoul" with a redirect to "/seoul/".
// Links point at the final address, so Search Console does not list them as "Page with redirect".
export function withSlash(to: string): string {
  const [path, rest] = to.split(/(?=[?#])/, 2).concat('').slice(0, 2)
  if (!path.startsWith('/') || path === '/' || path.endsWith('/') || path.slice(path.lastIndexOf('/') + 1).includes('.')) return to
  return `${path}/${rest}`
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...props }, ref) {
  return <RouterLink ref={ref} to={typeof to === 'string' ? withSlash(to) : to} {...props} />
})

export default Link
