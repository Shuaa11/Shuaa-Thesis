import React from "react";
import {Col, Row} from "antd";

export default function PageFrame(props) {

    return <>
        <Row >
            <Col style={{backgroundColor:"black",overflow:"visible"}} xs={0} sm={0} md={0} lg={0}  >

            </Col>
            <Col xs={24} sm={24} md={24} lg={24} >
                <div
                    style={{
                        backgroundColor:'#404957',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width:"100%",
                        height:props.height,




                    }}
                >

                    {props.children}

                </div>

            </Col>

            <Col style={{backgroundColor:"black"}}  xs={0} sm={0} md={0} lg={0}i  >
                <img style={{width:100,height:props.height,
                    float:"left", right:100,position:"relative", zIndex:1}} src={"fades/fade_left.png"} />
            </Col>
        </Row>
    </>
}