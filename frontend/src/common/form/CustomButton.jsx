import React from 'react';

export default ({ row, onClickBtn, nameBtn, icon }) => {
    const clickBtn = () => {
        onClickBtn(row);
    };

    return (
        <div>
            <button className={`btn btn-${nameBtn}`} onClick={clickBtn}>
                <i className={`fa fa-${icon}`}></i>
            </button>
        </div>
    );
};
