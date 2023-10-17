
import classes from '../Questionnere/Questionnere.module.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Question = ({ question, onOptionChange }) => {
    const handleNextQuestion = () => {
        var selectedOption = document.querySelector(`.${classes.opt} input[name="options"]:checked`);
        if (selectedOption) {
            onOptionChange(selectedOption.value);
            selectedOption.checked = false;
        } else {
            console.log("Select an option");
        }
    };
    
    
    var progress = (question.num / 21) * 100;
    // const percentageTextPosition = progress > 1 ? progress + 4.8 : 9;
    

    return (
        <div className={`${classes['question-format']}`} style={{ backgroundColor: '#211F1F' }}>
            <header className={classes.header}>
                <div className={classes['logo-container']}>
                    <img
                        src="/Cyber Ethos Logo.png"
                        alt="Cyber Ethos Logo"
                        width={319.02}
                        height={142.92}
                        className={classes.logo}
                    />
                </div>
            </header>
                    <p className={classes['logo-text']}>ISO27001 Assessment</p>
                        <ProgressBar striped variant="warning" animated now={progress} />;
            {/* <div className={classes.progressBarContainer}>
                <div className={classes.progressBar} style={{ width: `${progress}%` }}>
                    <span className={classes.progresstxt} style={{ color: 'rgb(251, 205, 50)', position: 'absolute', left: `${percentageTextPosition}%` }}>{`${progress.toFixed(2)}%`}</span>
                </div>
            </div> */}
            <h2 className={classes.questionhed} style={{ color: 'rgb(251, 205, 50)' }}>{question.name}</h2>
            <h5 className={classes.question} style={{ color: 'rgb(251, 205, 50)' }}>{question.question}</h5>
            <form className={classes.form}>
                {question.options.map((option, index) => (
                    <div className={classes.opt} key={index}>
                        <input
                            type="radio"
                            id={`option${index}`}
                            name="options"
                            value={option[1]}
                        />
                        <label htmlFor={`option${index}`} style={{ color: 'rgb(255, 255, 255)' }}>{option[0]}</label>
                        <br />
                    </div>
                ))}
            </form>
            <button onClick={handleNextQuestion}>
                Next
            </button>

        </div>
    );
};

export default Question;
