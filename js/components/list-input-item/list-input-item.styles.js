export const styles = `
    <style>
        .list-input-item {
            display:flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
        }
        
        .list-input-item__content:before {
            content: '•';
            margin-right: 5px;
        }
        
        .list-input-item__content{
            font-size: 12px;
        }
        
        .list-input-item__remove-btn {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        
        .list-input-item__remove-btn:hover,
        .list-input-item__remove-btn:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
    </style>
`
