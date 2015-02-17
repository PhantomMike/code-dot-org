module StagesHelper
  def stage_title(script, stage_or_game)
    if script.multiple_games?
      if stage_or_game.instance_of? Game
        game = stage_or_game
        title = data_t_suffix('script.name', script.name, game.name)
        title += ': '
        title += (data_t('game.name', game.name) || game.name)
        return title
      else # stage
        stage = stage_or_game
        title = t('stage_number', number: stage.position)
        title += ': '
        title += data_t_suffix('script.name', script.name, stage.name)
        return title
      end
    else # script only has one stage/game, use the script name
      data_t_suffix('script.name', script.name, 'title')
    end
  end

  def stage_name(script, stage_or_game)
    if script.multiple_games?
      if stage_or_game.instance_of? Game
        return (data_t('game.name', stage_or_game.name) || stage_or_game.name)
      else # stage
        return data_t_suffix('script.name', script.name, stage_or_game.name)
      end
    else
      return data_t_suffix('script.name', script.name, 'title')
    end
  end

  def lesson_plan_html_url(stage)
    "#{lesson_plan_base_url(stage)}/Teacher"
  end

  def lesson_plan_pdf_url(stage)
    "#{lesson_plan_base_url(stage)}/Teacher.pdf"
  end

  def lesson_plan_base_url(stage)
    CDO.code_org_url "/curriculum/#{stage.script.name}/#{stage.position}"
  end
end
