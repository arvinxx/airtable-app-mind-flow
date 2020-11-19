export const style = `
.minimap{
  border: 1px solid rgba(0,0,0,0.09);
  border-radius: 2px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: white;
  opacity:0.7
}

.g6-tooltip {
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px 16px;
  width: 330px;
  box-shadow: rgba(0,0,0,0.09) 0px 4px 8px;
}
.g6-tooltip-title {
  font-size: 14px;
  color:rgba(0,0,0,0.65);
  font-weight: bold;
}
.g6-tooltip-description {
  margin-top: 8px;
  color:rgba(0,0,0,0.65);
  font-size: 12px;
  overflow-y: scroll;
  max-height: 200px;
  border-top: solid 1px rgba(0,0,0,0.09);
}
.g6-tooltip-description pre{
  background: #f1f1f1;
  padding: 8px;
  overflow: scroll;
}

.g6-tooltip-information {
  margin: 16px 0 8px;
  color:rgba(0,0,0,0.65);
  font-size: 12px;
  font-weight: bold;
  padding-top:8px;
  border-top: solid 1px rgba(0,0,0,0.09);
}
.g6-tooltip-info-item {
  color:rgba(0,0,0,0.45);
  font-size: 12px;
  margin-left: 4px;
  margin-bottom: 4px;
}
`;
