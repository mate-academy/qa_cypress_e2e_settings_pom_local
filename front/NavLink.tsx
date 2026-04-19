import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavLinkProps {
  href: string
  onClick?: () => void
  children: React.ReactNode
  dataCy?: string
}

const NavLink = ({ href, onClick, children, dataCy }: NavLinkProps) => {
  const router = useRouter()
  const { asPath } = router

  return (
    <Link href={href} passHref>
      <a
        data-cy={dataCy}
        onClick={onClick}
        className={`${
          (encodeURIComponent(asPath) === encodeURIComponent(href) &&
            'active ') ||
          ''
        }nav-link`}
      >
        {children}
      </a>
    </Link>
  )
}

export default NavLink