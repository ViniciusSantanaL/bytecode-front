import React from 'react'
import './Button.scss'

export default function Button(props: { className?: string; secondClassName?: string; typeButton?: 'button' | 'submit' | 'reset' | undefined; children?: string; onClick?: () => void }) {
  return (
    <div className="button-base">
      <button className={props.className} type={props.typeButton} onClick={props.onClick}>
        <span className="icon text-white-50">
          <i className={props.secondClassName}></i>
        </span>
        <span className="text">{props.children}</span>
      </button>
    </div>
  )
}
