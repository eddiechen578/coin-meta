import React, {useState, useEffect} from "react";
import styles from '@/styles/animation.module.css';

interface IProps {
    num: number,
    trigger: boolean
}
const DiceRoll = (props: IProps)=>{

    const {num, trigger} = props;

    const [count, setCount] = useState<number>(0);

    useEffect(()=>{
        let start: number = 0;

        const end: number = 6;

        if(num == 0) return;
        if (start === end) return;

        let recursive: boolean = false;

        let timer = setInterval(() => {
            start += 1;
            setCount(start)
            if(recursive){
                if(start == num) clearTimeout(timer)
            }

            if (start === end){
                if(!recursive){
                    start = 0;
                    recursive = true;
                }
            }
        }, 50);

    }, [trigger])


    return (
        <div className={styles.Count}>
            {count}
        </div>
    )

}

export default React.memo(DiceRoll);