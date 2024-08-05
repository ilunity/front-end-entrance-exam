export const styles = `
    <style>
        .modal {
            display: none; 
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4);
        }
        
        .modal_open {
            display: block;
        }
        
        .modal__content {
            position: relative;
            background-color: #fefefe;
            margin: 100px auto;
            border: 1px solid #888;
            width: 80%;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
            animation-name: animatetop;
            animation-duration: 0.4s
        }
        
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            margin-left: auto;
        }
        
        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        
        .modal__header {
            display:flex;
            font-size: 16px;
            align-items: center;
            height: 30px;
            padding: 2px 16px;
            background-color: #28D979;
            color: white;
        }
        
        .modal__body {padding: 30px 20px;}
        
        .modal__footer {
            padding: 2px 16px;
            background-color: #28D979;
            color: white;
        }
        
        @keyframes animatetop {
            from {top: -300px; opacity: 0}
            to {top: 0; opacity: 1}
        }
    </style>
`
