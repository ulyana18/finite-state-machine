class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config) throw new Error();
        this.config = config;
        this.state = config.initial;
        this.stack = [];
        this.deleted = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(state in this.config.states) {
            this.stack.push(this.state);
            this.state = state;
            this.deleted = [];
        }
        else throw new Error();        
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(event in this.config.states[this.state].transitions) {
            this.stack.push(this.state);
            this.state = this.config.states[this.state].transitions[event];
            this.deleted = [];
        }
        else throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
        this.stack = []; 
        return this;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let array = [];
        if(!event) {
            for(let state in this.config.states)
                array.push(state);
        }
        else {
            for(let state in this.config.states) 
                (event in this.config.states[state].transitions)? array.push(state) : 0;
        }
        return array;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.stack.length === 0) return false;
        this.deleted.push(this.state);
        this.state = this.stack.pop();
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.deleted.length === 0) return false;
        this.stack.push(this.state);
        this.state = this.deleted.pop();
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.stack = [];
        this.deleted = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
