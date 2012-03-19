class ManualController < ApplicationController

  def show
    params[:id] = 'instrucoes-iniciais' if params[:id].blank?
    render params[:id]
  end

end
