import "./featured.scss"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Accuracy of the prediction</h1>
                <MoreVertIcon fontSize="larger"/>
            </div>
            <div className="bottom">
               <div className="featuredChart">
                   <CircularProgressbar value={70} text={"70%"} strokeWidth={10}/>
               </div>
               <p className="title">Model KNN</p>
               <p className="amount">9/10</p>
               <p className="desc">Prediction accuracy of real time data coming throgh the model</p>
               <div className="summary">
                <div className="item">
                    <div className="itemTitle">Target</div>
                    <div className="itemResult negative">
                        <KeyboardArrowDownIcon fontSize="small"/>
                        <div className="resultAmounts">100%</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Month</div>
                    <div className="itemResult positive">
                        <KeyboardArrowUpOutlinedIcon fontSize="small"/>
                        <div className="resultAmounts">80%</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last two Month</div>
                    <div className="itemResult positive">
                        <KeyboardArrowUpOutlinedIcon fontSize="small"/>
                        <div className="resultAmounts">80%</div>
                    </div>
                </div>
               </div>
            </div>
        </div>

        
    )
}



export default Featured