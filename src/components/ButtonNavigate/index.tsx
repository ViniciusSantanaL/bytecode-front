import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ButtonNavigate(props: { className: string; path: string; children: string }) {
  const navigate = useNavigate()
  return (
    <button className={props.className} onClick={() => navigate(props.path)}>
      <span className="icon text-white-50">
        <i className="fas fa-info-circle"></i>
      </span>
      <span className="text">{props.children}</span>
    </button>
  )
}
