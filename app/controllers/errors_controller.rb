class ErrorsController < ApplicationController
    # letting frontend handle 404 for more consistency
    def not_found
        render layout: 'application', template: 'vite/index'
    end
  end