import React from 'react'

function Pop({setOpen, children}) {
  return (
    <aside className='pop'>
        <div className="con">{children}</div>
        <span className='close' onClick={()=>setOpen(false)}>close</span>
        {/* 닫아줘야되니까 false넣은거임 */}
    </aside>
  )
}

export default Pop