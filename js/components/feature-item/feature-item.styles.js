export const styles = `
    <style>
        .feature-item {
            display:flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
        }
        
        .feature-item__content:before {
            content: '•';
            margin-right: 5px;
        }
        
        .feature-item__content{
            font-size: 12px;
        }
        
        .feature-item__remove {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        
        .feature-item__remove:hover,
        .feature-item__remove:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
    </style>
`
