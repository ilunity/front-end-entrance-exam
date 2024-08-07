export const styles = `
    <style>
        .box {
            height: 100%;
            background: #F0F0F0;
            min-height: 124px;
            min-width: 124px;
            border-radius: 12px;
        }
        
        .box__inner {
            display: flex;
            flex-direction: column;
            padding: 12px;
            min-height: 100%;
            gap: 16px;
        }
        
        .box__title {
            font-size: 14px;
            line-height: 21px;
        }        
        
        .box__content {
            display: flex;
            flex-direction: column;
            flex: 1;
        }
    </style>
`;
