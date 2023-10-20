import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const Pop = forwardRef(({ children }, ref) => {
    const [Open, setOpen] = useState(false);
    useImperativeHandle(ref, () => {
        return {
            open: () => setOpen(true)
        }
    });
    return (
        <>
            <AnimatePresence>
                {Open &&
                    (
                        <motion.aside className="pop"
                            initial={{ opacity: 0, scale: 0, rotate: 45 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5 } }}
                            exit={{
                                opacity: 0, x: "50%", transition: { duration: 0.5, delay: 0.5 }
                            }}
                        >
                            <motion.div className="con"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
                                exit={{ opacity: 0, transition: { duration: 0.5 } }}

                            >{children}</motion.div>
                            <motion.span className='close'
                                onClick={() => setOpen(false)}
                                initial={{ x: 100, opacity: 0 }}
                                animate={{
                                    x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 }
                                }}
                                exit={{ opacity: 0, x: 100 }}
                            >close</motion.span>
                        </motion.aside>
                    )}
            </AnimatePresence>
        </>
    )
})


// function Pop({ setOpen, children }) {
//     return (
//         <aside className="pop">
//             <div className="con">{children}</div>
//             <span className='close'
//                 onClick={() => setOpen(false)}
//             >close</span>
//         </aside>
//     )
// }

export default Pop

/*
forwardRef의 흐름
1. pop의 화살표함수를 forwardRef의 인수로 전달된다
2. forwardRef로 전달되는 화살표함수의 두번째 파라미터로 ref가 전달되고,
이것을 Gallery에서 Pop컴포넌트와 연결된다, (갤러리의 Pop컴포넌트오 ref가 선언되어야한다)
3. forwardRef안에있는 useImperativeHandle함수를 호출하여 부모인 갤러리가 해당 매서드를 사용할 수 있게된다
4. forwardRef안에있는 리턴값이 반환되는데 어디로? 부모컴포넌트로 반환된
따라서 부모컴포넌트는 자식컴포넌트 자체를 참조할 수 있게됨


*/