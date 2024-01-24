function select(selector) {
    const self = {
        elements: document.querySelectorAll(selector),
        select: function(selector) {
            this.elements = document.querySelectorAll(selector);
            return this;
        },
        first: function() {
            this.elements = this.elements.length > 0 ? [this.elements[0]] : [];
            return this;
        },
        last: function() {
            this.elements = this.elements.length > 0 ? [this.elements[this.elements.length - 1]] : [];
            return this;
        },
        eq: function(index) {
            this.elements = this.elements.length > index ? [this.elements[index]] : [];
            return this;
        },
        find: function(selector) {
            if (this.elements.length > 0) {
                this.elements = this.elements[0].querySelectorAll(selector);
            }
            return this;
        },
        parent: function() {
            if (this.elements.length > 0 && this.elements[0].parentNode) {
                this.elements = [this.elements[0].parentNode];
            }
            return this;
        },
        children: function() {
            if (this.elements.length > 0) {
                this.elements = Array.from(this.elements[0].children);
            }
            return this;
        },
        // 更多方法...
    };
    return self;
}