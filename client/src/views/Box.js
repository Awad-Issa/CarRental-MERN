import React from 'react'
import ListItem from './ListItem';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
    Link
  } from "react-router-dom";
const Box = (props) => {




    const boxStyle = {
        boxShadow: "5px 5px 15px #aaaaaa",
        borderRadius: "15px",
        width: "300px",
        height: "600px",
        border: "2px solid black",
        margin: "10px"

    }


    const taskBox = {
        border: "1px solid black",
        padding: "5px",
        margin: "10px"
    }
    const title = {
        h1: "   Completed "
    }

    const buttonStyle = {
        width: "250px"
    }

    const getText = (value) => {
        return value.status === "todo"
            ? "Start Doing"
            : value.status === "doing" ? "Done with This Task" : "Remove Task"
    }


    return (
        <>

            <div style={boxStyle}>
                <h1 style={{ backgroundColor: props.bak }}> {props.val}</h1>
                {props.data.map((value, index) => {
                    return (
                        <>
                            <ListItem
                                title={title}
                                data={value}
                                header={value.name}
                                time={value.date}
                                key={index}
                                buttonStyle={buttonStyle}
                                listStyle={taskBox}
                                buttonCallBack={(e) => props.callBack(e, value)}
                                buttonText={getText(value)}
                            />

                        </>
                    )
                }
                )
                }

            </div>
        </>
    )
}

export default Box
