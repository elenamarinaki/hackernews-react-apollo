import React from "react"

export const Link = ({ link }) => {
  return (
    <div>
      <div>
        {link.id} - {link.description} - ({link.url})
      </div>
    </div>
  )
}
