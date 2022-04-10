import React from "react";
import CandleChart from "./CandleChart";
import {Col, Row} from "antd";
import LineChart from "./LineChart";

export default function Charts(){

    return <>
        <Row>
            <Col span={12}>
                <CandleChart></CandleChart>
            </Col>
            <Col span={12} offset={12}>
                <LineChart></LineChart>
            </Col>
        </Row>
    </>
}