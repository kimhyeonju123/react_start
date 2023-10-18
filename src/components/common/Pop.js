import { useState,forwardRef,useRef,useImperativeHandle } from "react"
import { motion, AnimatePresence } from "framer-motion";

const Pop = forwardRef(({children}, ref)=>{
	const [Open, setOpen] = useState(false); 
	useImperativeHandle(ref,()=>{
		return{
			open: ()=>setOpen(true)
		}}
	);
	return(
		<>
			<AnimatePresence>
				{Open && (
						<motion.aside className='pop' initial={{rotate:360,opacity:0, scale:0 }} 
							animate={{rotate:0,opacity:1, scale:1,transition:{duration:0.5}}} 
							exit={{rotate:360,opacity:0, scale:0,transition:{duration:0.5, delay:0.5}}}>

						<motion.div className="con" initial={{rotate:180,opacity:0}}
							animate={{rotate:0,opacity:1, transition:{duration:0.5,delay:0.5}}}
							exit={{rotate:360,opacity:0, transition:{duration:0.5}}}>{children}</motion.div>

						<motion.span className='close' onClick={()=>setOpen(false)}
						initial={{x:500,opacity:0, rotate:360}}
						animate={{x:0, opacity:1, transition:{duration:0.5, delay:.5}, rotate:0}}
						exit={{opacity:0, x:500,rotate:360}}>close</motion.span>
						</motion.aside>
				)}
			</AnimatePresence>
		</>
	)
})

// function Pop({setOpen, children}) {
//   return (
//     <aside className='pop'>
//         <div className="con">{children}</div>
//         <span className='close' onClick={()=>setOpen(false)}>close</span>
//         {/* 닫아줘야되니까 false넣은거임 */}
//     </aside>
//   )
// }

export default Pop

/*forwardRef의 흐름
1. pop의 화살표 함수를 forwardRef의 인수로 전달된다
2. forwardRef로 전달되는 화살표 함수의 두번째 파라미터로 ref가 전달되고
	이것은 Gallery에서 Pop컴포넌트와 연결된다(노예계약) (갤러리의 Pop컴포넌트로 ref가 선언되어야 한다)
3. forwardRef안에 있는 useImperativeHandle 함수를 호출하여 부모인 갤러리가 해당 메소드를 사용할 수 있게 된다
4. forwardRef안에 있는 리턴값이 반환되는데 (부모컴포넌트로)
	따라서 부모컴포넌트는 자식 컴포넌트 자체를 참조할 수 있게 됨
*/ 