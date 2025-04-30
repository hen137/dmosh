import { useDispatch, useSelector } from "react-redux";
import { changeEffect } from "../../redux/effect";
import { AppDispatch, RootState } from "../../redux/store";
import './screen.css'

const screen = () => {
    const effect = useSelector((state: RootState) => state.effect.value);
    const mouse = useSelector((state: RootState) => state.mouse)
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="container">
            <div className="screen">
                <ul>
                    <li onClick={() => dispatch(changeEffect('MODE 1'))}>MODE 1</li>
                    <li onClick={() => dispatch(changeEffect('MODE 2'))}>MODE 2</li>
                    <li onClick={() => dispatch(changeEffect('MODE 3'))}>MODE 3</li>
                </ul>
                <div className="actionLog">
                    {effect}\n
                    xPos: {mouse.xPos}, yPos: {mouse.yPos}
                </div>
            </div>
            <p className="title">
                Data.mosh
            </p>
        </div>
    );
};

export default screen;