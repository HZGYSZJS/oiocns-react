import { model, schema } from '@/ts/base';
import { IBelong } from '@/ts/core';
import React from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import FormItem from './formItem';
import { Emitter } from '@/ts/base/common';
import { getItemNums } from '../Utils';

const WorkFormViewer: React.FC<{
  data?: any;
  belong: IBelong;
  form: schema.XForm;
  readonly?: boolean;
  showTitle?: boolean;
  fields: model.FieldModel[];
  onValuesChange?: (changedValues: any, data: any) => void;
}> = (props) => {
  const formData: any = props.data || {};
  const [notifyEmitter] = React.useState(new Emitter());
  const [colNum, setColNum] = React.useState('二列');
  return (
    <div style={{ padding: 16 }}>
      <Toolbar height={60}>
        <Item
          location="center"
          locateInMenu="never"
          render={() => (
            <div className="toolbar-label">
              <b style={{ fontSize: 28 }}>{props.form.name}</b>
            </div>
          )}
        />
        <Item
          location="after"
          locateInMenu="never"
          widget="dxSelectBox"
          options={{
            text: '项排列',
            value: colNum,
            items: getItemNums(),
            onItemClick: (e: { itemData: string }) => {
              setColNum(e.itemData);
            },
          }}
        />
      </Toolbar>
      <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: 10 }}>
        {props.fields.map((field) => {
          return (
            <FormItem
              key={field.id}
              data={formData}
              numStr={colNum}
              readOnly={props.readonly}
              field={field}
              notifyEmitter={notifyEmitter}
              onValuesChange={props.onValuesChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WorkFormViewer;
